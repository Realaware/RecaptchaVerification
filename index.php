<?php
     $token = $_GET['token'];

     $cu = curl_init();
    
     if (!$token) {
      echo "Invaild Token Given.";
      return;
     }

     curl_setopt($cu,CURLOPT_URL,"localhost/checktoken/$token");
     curl_setopt($cu,CURLOPT_RETURNTRANSFER,TRUE);
     $res = curl_exec($cu);
    
     if (json_decode($res)->success == false) {
      echo $res;
      return;
     }

     curl_close($cu);
?>

<html>
 <head>
 <script src="https://www.google.com/recaptcha/api.js" async defer></script>
</head>

<body>
   <h1>To Get Verifed. Press The recaptcha button !</h1>
   <form action="verify.php" method="POST">
      <div class="g-recaptcha" data-sitekey=""></div>
      <br/>
      <input type="submit" value="Submit">
      <input type='hidden' value=<?php echo $token; ?> name="token">
    </form>
</body
</html>
