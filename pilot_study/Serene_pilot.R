
#### #Setup ####

install.packages('GPArotation')

#clearworkspace
rm(list=ls())
#setdirectory
setwd("/Users/leonard/Desktop/Datenauswertung")
#libraries/Packages
library("markdown")
library("Hmisc")
library("lintr")
library("psych")
library("knitr")
library("GPArotation")

#einlesenderdaten
Alldata <- read.table("/Users/leonard/Desktop/Datenauswertung/SERENE/SereneImplementation_DATA_2019-08-08_0932.csv", header=T,sep=",", encoding="latin1")


Obstacles <- subset(Alldata, select = c(no_plan_b:proc_2_b,conc_1_d:mood_d)) 

#### EFA ####

parallel <- fa.parallel(Obstacles, fm = 'minres', fa = 'fa')

# sixfactor
sixfactor <- fa(Obstacles,nfactors = 6,rotate = "oblimin",fm="minres")
print(sixfactor)

print(sixfactor$loadings,cutoff = 0.3)

#fourfactor
fourfactor <- fa(Obstacles,nfactors = 4,rotate = "oblimin",fm="minres")


print(fourfactor$loadings,cutoff = 0.3)

#### ausz??hlen ####

mean_obstacles <- (sapply(Obstacles, mean, na.rm=TRUE))

mean_obstacles
sort(mean_obstacles, decreasing = T)
