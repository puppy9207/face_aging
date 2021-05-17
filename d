warning: LF will be replaced by CRLF in src/App.js.
The file will have its original line endings in your working directory
[1mdiff --git a/src/App.js b/src/App.js[m
[1mindex 641e62e..b445d57 100644[m
[1m--- a/src/App.js[m
[1m+++ b/src/App.js[m
[36m@@ -35,10 +35,9 @@[m [mfunction App() {[m
     <TopBarTemplateBlock>[m
       <Grid container>[m
         <Grid item sm={3} xs={12}><a href="#"><img width="25%" src={ imgA }/></a></Grid>[m
[31m-        <Grid item sm={6} xs={0} ></Grid>[m
         <Grid item sm={1} xs={0}><p>BEST STYLE</p></Grid>[m
         <Grid item sm={1} xs={0}><p>머리스타일링</p></Grid>[m
[31m-        <Grid item sm={1} xs={0}><p>사용자</p></Grid>[m
[32m+[m[32m        <Grid item sm={1} xs={0}><p>이미지 자르기</p></Grid>[m
       </Grid>[m
     </TopBarTemplateBlock>[m
     <MainContainerTemplate>[m
