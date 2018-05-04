<?php

    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["name"]));
				$name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $message = trim($_POST["message"]);

        // Check that data was sent to the mailer.
        if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Wystąpił nieoczekiwany błąd, spróbuj później. Błąd 400";
            exit;
        }

        // Set the recipient email address.
        // gFIXME: Update this to your desired email address.
        $recipient = "kontakt@kubarazny.pl";

        // Set the email subject.
        $subject = "Nowa wiadomość na kubarazny.pl from $name";

        // Build the email content.
        $email_content = "Imię i nazwisko: $name\n";
        $email_content .= "Email: $email\n\n";
        $email_content .= "Wiadomość:\n$message\n";

        // Build the email headers.
        $email_headers = "From: $name <$email>";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "Dziękuję! Wiadomość została wysłana poprawnie.";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Wystąpił nieoczekiwany błąd, spróbuj później. Błąd 500";
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "Wystąpił nieoczekiwany błąd, spróbuj później. Błąd 403";
    }

?>