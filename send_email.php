<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Recupera i dati dal form
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $ospiti = $_POST['ospiti'];
    $partecipazione = $_POST['partecipazione'];
    $messaggio = $_POST['messaggio'];

    // Recupera gli allergeni (gestisce i checkbox)
    $allergeni = [];
    if(isset($_POST['allergeneGlutine'])) $allergeni[] = "Glutine";
    if(isset($_POST['allergeneFruttaSecca'])) $allergeni[] = "Frutta a guscio";
    if(isset($_POST['allergeneLatticini'])) $allergeni[] = "Latticini";
    if(isset($_POST['allergeneUova'])) $allergeni[] = "Uova";
    if(isset($_POST['allergeneCrostacei'])) $allergeni[] = "Crostacei";
    if(isset($_POST['allergeneSoia'])) $allergeni[] = "Soia";
    if(isset($_POST['allergeneAltro']) && !empty($_POST['specificaAllergeni'])) {
        $allergeni[] = "Altro: " . $_POST['specificaAllergeni'];
    }
    $allergeni_string = implode(", ", $allergeni); // Converte l'array in una stringa separata da virgole

    // 2. Prepara l'email
    $to = "matteocota@outlook.it"; // **MODIFICA CON LA TUA EMAIL!**
    $subject = "Nuova RSVP dal sito web";
    $message = "Hai ricevuto una nuova RSVP dal tuo sito web!\n\n";
    $message .= "Nome: " . $nome . "\n";
    $message .= "Email: " . $email . "\n";
    $message .= "Numero di ospiti: " . $ospiti . "\n";
    $message .= "Parteciperà a: " . $partecipazione . "\n";
    if (!empty($allergeni_string)) { // Aggiunge la sezione allergeni solo se ci sono allergeni selezionati
        $message .= "Allergeni: " . $allergeni_string . "\n";
    }
    $message .= "Messaggio:\n" . $messaggio . "\n";
    $headers = "From: modulo-rsvp@iltuosito.com"; // **MODIFICA CON UN INDIRIZZO EMAIL VALIDO DEL TUO DOMINIO (o rimuovi From)**
    //  Nota sulla riga "From:": Molti server di posta richiedono che l'indirizzo "From:" sia un indirizzo email valido del dominio da cui viene inviata l'email.
    //  Se hai un dominio per il tuo sito web (es. iltuosito.com), sostituisci "modulo-rsvp@iltuosito.com" con un indirizzo valido del tuo dominio.
    //  Se non hai un dominio o non sei sicuro, potresti rimuovere completamente la riga `$headers = ...;` (la funzione mail() funzionerà comunque, ma potrebbe finire nello spam).

    // 3. Invia l'email
    if (mail($to, $subject, $message, $headers)) {
        // Email inviata con successo
        echo '<div class="alert alert-success" role="alert">Grazie! La tua RSVP è stata inviata con successo.</div>';
         // Potresti anche reindirizzare l'utente a una pagina di ringraziamento:
         // header("Location: pagina-di-ringraziamento.html");
         // exit();

    } else {
        // Errore nell'invio dell'email
        echo '<div class="alert alert-danger" role="alert">Si è verificato un errore nell\'invio della tua RSVP. Riprova più tardi.</div>';
    }
}
?>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Risposta RSVP</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-5">
        <?php
        // Il codice PHP di risposta (alert di successo/errore) verrà inserito qui
        ?>
        <p><a href="la_tua_pagina_form.html">Torna al modulo RSVP</a></p>  </div>
</body>
</html>