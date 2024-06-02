<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./assets/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>

<body>

    <div class="file-uploader">
        <header class="uploader-header">
            <h2 class="uploader-title">File Uploader</h2>
            <h4 class="file-completed-status"></h4>
        </header>
        <ul class="file-list"></ul>
        <div class="file-upload-box">
            <h2 class="box-title">
                <span class="file-instruction">Drag files here or</span>
                <span class="file-browse-button">browse</span>
            </h2>
            <input type="file" class="file-browse-input" multiple hidden>
        </div>
    </div>

    <script src="./assets/js/script.js"></script>
</body>

</html>