<?php
require("creds.php");
echo $_POST["method"]();
function sanitize($str, $quotes = ENT_NOQUOTES) {
    $str = htmlspecialchars($str, $quotes);
    return $str;
}
function getSong() {
    $dbConn = mysqli_connect(server(), username(), password(), db());
    $query = "SELECT * FROM MusicExamples";
    $result = $dbConn->query($query);
    if ($dbConn->connect_error) {
        $return->connect_error = "Connection failed: " . $dbConn->connect_error;
        $return->success = false;
        return json_encode($return);
    }
    $SongName = array();
    if ($result) {
        while ($row = $result->fetch_array()) {
            $allColumns = array();
            for ($i = 0; $i < 4; $i++) {
                array_push($allColumns, $row[$i]);
            }
            array_push($SongName, $allColumns);
        }
    }
    $return = new stdClass();
    $return->success = true;
    $return->SongName = $SongName;
    $return->querystring = $query;
    return json_encode($return);
}
function getGenre() {
    $dbConn = mysqli_connect(server(), username(), password(), db());
    $query = "SELECT * FROM MusicGenres";
    $result = $dbConn->query($query);
    if ($dbConn->connect_error) {
        $return->connect_error = "Connection failed: " . $dbConn->connect_error;
        $return->success = false;
        return json_encode($return);
    }
    $idMusicGenre = array();
    if ($result) {
        while ($row = $result->fetch_array()) {
            $allColumns = array();
            for ($i = 0; $i < 2; $i++) {
                array_push($allColumns, $row[$i]);
            }
            array_push($idMusicGenre, $allColumns);
        }
    }
    $return = new stdClass();
    $return->success = true;
    $return->idMusicGenre = $idMusicGenre;
    $return->querystring = $query;
    return json_encode($return);
}
function insertSong() {
    if (isset($_POST['Genre'])) {
        $Genre = json_decode(sanitize($_POST['Genre']));
    }
    if (isset($_POST['SongName'])) {
        $SongName = json_decode(sanitize($_POST['SongName']));
    }
    if (isset($_POST['YoutubeLink'])) {
        $YoutubeLink = json_decode(sanitize($_POST['YoutubeLink']));
    }
    $dbConn = mysqli_connect(server(), username(), password(), db("MusicExamples"));
    if ($dbConn->connect_error) {
        die("Connection failed: " . $dbConn->connect_error);
    }
    $query = "INSERT INTO MusicExamples ( Genre, SongName, YoutubeLink ) " .
            "VALUES ( " .
            "'" . $Genre . "', " .
            "'" . $SongName . "', " .
            "'" . $YoutubeLink . "' );";
    $result = $dbConn->query($query);
    $return = new stdClass;
    $return->querystring = (string) $query;
    if ($result) {
        $return->success = true;
    } else {
        $return->success = false;
    }
    return json_encode($return);
}