<?php

error_reporting( E_ALL );
ini_set( 'display_errors', '1' );

file_put_contents( 'logs/test.txt', date("H:m:s d.M.Y"), FILE_APPEND );

?>