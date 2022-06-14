<?php
include '/config/connectdb.js'

$q= 'select * from signup';
$qu= mysqli_query($conn , $q)
$num = mysqli_num_row($qu)

echo ($num)

?>