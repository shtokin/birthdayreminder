<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" type="text/css" href="{{ url(mix('css/app.css')) }}">
    <link rel="stylesheet" type="text/css" href="{{ url('css/semantic.css') }}">
    <script>
      // rename myToken as you like
      window.myToken = <?php echo json_encode([
            'csrfToken' => csrf_token(),
        ]); ?>
    </script>
    <script src="/js/manifest.js"></script>
    <script src="/js/vendor.js"></script>

    <script src="https://apis.google.com/js/api.js"></script>
    <title>Laravel</title>

</head>
<body>
    <div id="root"></div>

    <script type="application/javascript" src="{{ url(mix('js/app.js')) }}"></script>
</body>
</html>
