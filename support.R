library(data.table)
setwd("C:/Users/adsieg/Desktop/part_1")
news_data<-fread("news.csv", sep = ",", header= TRUE, encoding = 'UTF-8')

library(tidytext)
library(dplyr)
df_txt <- as.data.frame(news_data$description)
colnames(df_txt) <- c('text')
df_txt$text <-as.character(df_txt$text)


df_txt <- df_txt %>%
  unnest_tokens(word, text)

data(stop_words)

df_txt <- df_txt %>%
  anti_join(stop_words)

df_txt2 <-df_txt %>%
  count(word, sort = TRUE)

#################################### EDGES
edges<-NULL

n <- 500

for(i in 1:n){
  from <-df_txt[i,1]
  to <-  df_txt[i+1,1]
  label<-c('next_to')
  
  buffer<-cbind(from, to, label)
  edges<-rbind(edges,buffer)
}

edges<-as.data.frame(edges)

#################################### nodes

nodes <-df_txt[c(1:n+1),] %>% as.data.frame()
colnames(nodes) <- c('label')
nodes <-nodes[!duplicated(nodes$label), ] %>% as.data.frame()
colnames(nodes) <- c('label')
nodes$id<-nodes$label

library(visNetwork)

visNetwork(nodes, edges, width = "100%") %>% 
  visEdges(arrows = "from") %>% 
  visHierarchicalLayout() # same as   visLayout(hierarchical = TRUE) 

# ----------------------------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------------------------

setwd("C:/Users/adsieg/Desktop/part_1")
news_data<-fread("news.csv", sep = ",", header= TRUE, encoding = 'UTF-8')

# news_data$publishedAt<-as.Date(news_data$publishedAt)
news_data$publishedAt <- substr(news_data$publishedAt, 0, 10)

news_data<-news_data[,c(3,4,8)]
news_data$id <- paste0("id_",1:NROW(news_data))

news_data <- news_data[c(1:30),]

# edges 

final_edges<-NULL
for(i in 1:NROW(news_data)){ #NROW(news_data)
  from <-rep(news_data[i,4],NCOL(news_data)-1)
  to <-c(news_data[i,1],
         news_data[i,2],
         news_data[i,3])
  label<-c('published_at','coming_from','falling_down')
  
  buffer<-cbind(from,to,label) %>% as.data.frame()
  final_edges<-rbind(final_edges,buffer)
}

# nodes
###
buffer_links_bul1<-cbind(news_data$publishedAt,
                         as.data.frame(rep('date_publication',NROW(news_data))))
colnames(buffer_links_bul1)<-c('label','group')

###
buffer_links_bul2<-cbind(news_data$source,
                         as.data.frame(rep('source',NROW(news_data))))
colnames(buffer_links_bul2)<-c('label','group')

###
buffer_links_bul3<-cbind(news_data$category,
                         as.data.frame(rep('category',NROW(news_data))))
colnames(buffer_links_bul3)<-c('label','group')

###
buffer_links_bul4<-cbind(news_data$id,
                         as.data.frame(rep('news',NROW(news_data)))) 
colnames(buffer_links_bul4)<-c('label','group')

#### 

nodes <- rbind(as.data.frame(buffer_links_bul1),
               as.data.frame(buffer_links_bul2),
               as.data.frame(buffer_links_bul3),
               as.data.frame(buffer_links_bul4))

View(nodes)
final_nodes<-nodes[!duplicated(nodes$label), ]
final_nodes$id <- final_nodes$label
library(visNetwork)

visNetwork(final_nodes, final_edges)

saveRDS(final_nodes,"C:/Users/adsieg/Desktop/part_1/final_nodes_part_2.RDS")
saveRDS(final_edges,"C:/Users/adsieg/Desktop/part_1/final_edges_part_2.RDS")



# ----------------------------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------------------------

setwd("C:/Users/adsieg/Desktop/part_1")
news_data<-fread("news.csv", sep = ",", header= TRUE)

news_data$category<-as.factor(news_data$category)

# --- 
general_news <- news_data %>% 
  filter(category == "general") %>% 
  select(description) 

text_df <- as.data.frame(general_news)
colnames(text_df)<-c('text')

text_df <- text_df %>%
  unnest_tokens(word, text)

general_news <- text_df %>%
  anti_join(stop_words)

general_news <- general_news %>%
  count(word, sort = TRUE)

general_news$author <- c('General news')

# ---

sport_news <- news_data %>% 
  filter(category == "sport") %>% 
  select(description) 

text_df <- as.data.frame(sport_news)
colnames(text_df)<-c('text')

text_df <- text_df %>%
  unnest_tokens(word, text)

sport_news <- text_df %>%
  anti_join(stop_words)

sport_news <- sport_news %>%
  count(word, sort = TRUE)

sport_news$author <- c('sport news')

# ---
business_news <- news_data %>% 
  filter(category == "business") %>% 
  select(description) 

text_df <- as.data.frame(business_news)
colnames(text_df)<-c('text')

text_df <- text_df %>%
  unnest_tokens(word, text)

business_news <- text_df %>%
  anti_join(stop_words)

business_news <- business_news %>%
  count(word, sort = TRUE)

business_news$author <- c('business news')

# --- 

frequency <- rbind(general_news,
                   business_news,
                   sport_news)

frequency <-frequency %>%
  mutate(proportion = n / sum(n)) %>% 
  select(-n) %>% 
  spread(author, proportion) %>% 
  gather(author, proportion, `General news`:`sport news`)

saveRDS(frequency,"C:/Users/adsieg/Desktop/part_1/frequency.RDS")

library(scales)
library(ggplot2)

# expect a warning about rows with missing values being removed
ggplot(frequency, aes(x = proportion, y = `business news`, color = abs(`business news` - proportion))) +
  geom_abline(color = "gray40", lty = 2) +
  geom_jitter(alpha = 0.1, size = 2.5, width = 0.3, height = 0.3) +
  geom_text(aes(label = word), check_overlap = TRUE, vjust = 1.5) +
  scale_x_log10(labels = percent_format()) +
  scale_y_log10(labels = percent_format()) +
  scale_color_gradient(limits = c(0, 0.001), low = "darkslategray4", high = "gray75") +
  facet_wrap(~author, ncol = 2) +
  theme(legend.position="none") +
  labs(y = "business news", x = NULL) +
  theme_bw() + 
  theme(legend.position="none")



cor.test(data = frequency[frequency$author == 'General news',] ~ proportion)

cor.test(data = frequency[frequency$author == "Brontë Sisters",],
         ~ proportion + `Jane Austen`)


















