<?php
  if(isset($_POST['g-recaptcha-response'])) {
     $key = ""; //secret key
     $res = $_POST['g-recaptcha-response'];
     $url = "https://www.google.com/recaptcha/api/siteverify?secret=$key&response=$res";
     $fire = file_get_contents($url);
     $data = json_decode($fire);
     $token = $_POST['token'];

     if ($data->success == true) {
         echo "Verified ! You Can Back To Discord ";
         $cu = curl_init();
         curl_setopt($cu,CURLOPT_URL,"localhost:8081/verified/$token");
         curl_setopt($cu,CURLOPT_RETURNTRANSFER,TRUE);
         $res = curl_exec($cu);
     } else {
         echo "Failed To Verify.";
     }

  } else {
      echo "Invaild Verification";
      return;
  }
?>
