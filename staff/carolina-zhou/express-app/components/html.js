module.exports = function(content) {
    return `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Express App</title>
                <link rel="stylesheet" href="/index.css">
                <link rel="icon" href="/heart.ico" type="image/x-icon" />
                <script src="https://kit.fontawesome.com/0ebe3f9bf2.js"></script>
            </head>
            <body class="body">
                ${content}
            </body>
        </html>`
}