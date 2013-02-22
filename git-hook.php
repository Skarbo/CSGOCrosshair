<?php

error_reporting( E_ALL );
ini_set( 'display_errors', '1' );
set_time_limit( 0 );

function myErrorHandler( $errno, $errstr, $errfile, $errline )
{
    if ( !( error_reporting() & $errno ) )
    {
        // This error code is not included in error_reporting
        return;
    }

    $errorText = array ();

    switch ( $errno )
    {
        case E_USER_ERROR :
            $errorText[] = "<b>My ERROR</b> [$errno] $errstr<br />\n";
            $errorText[] = "  Fatal error on line $errline in file $errfile";
            $errorText[] = ", PHP " . PHP_VERSION . " (" . PHP_OS . ")<br />\n";
            $errorText[] = "Aborting...<br />\n";
            break;

        case E_USER_WARNING :
            $errorText[] = "<b>My WARNING</b> [$errno] $errstr<br />\n";
            break;

        case E_USER_NOTICE :
            $errorText[] = "<b>My NOTICE</b> [$errno] $errstr<br />\n";
            break;

        default :
            $errorText[] = "Unknown error type: [$errno] $errstr<br />\n";
            break;
    }

    file_put_contents( 'logs/error.txt', $errorText, FILE_APPEND );

    return true;
}

set_error_handler( "myErrorHandler" );

try
{

    $payload = json_decode( $_REQUEST[ 'payload' ] );

}
catch ( Exception $e )
{

    //log the error
    file_put_contents( 'logs/github.txt', $e . ' ' . $payload, FILE_APPEND );

    exit( 0 );
}

if ( $payload->ref === 'refs/heads/master' )
{

    $output = shell_exec( "git-puller.sh" );

    //log the request
    file_put_contents( 'logs/github.txt', $output, FILE_APPEND );

}
else
{
    file_put_contents( 'logs/error.txt', "Nothing to do", FILE_APPEND );
}

?>