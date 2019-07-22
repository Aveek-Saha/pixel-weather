<h1 align="center">
	<br>
	 Pixel Weather <img width = "32px" src = "https://github.com/Aveek-Saha/pixel-weather/blob/master/pixel.png">

</h1>

<h3 align="center">
    <img src ="https://img.shields.io/badge/platform-linux-green.svg?style=for-the-badge">
    <img src ="https://img.shields.io/github/stars/Aveek-Saha/pixel-weather.svg?style=for-the-badge">
    <img src ="https://img.shields.io/github/forks/Aveek-Saha/pixel-weather.svg?style=for-the-badge">
</h3>


<h3 align="center"> A small and compact 8 bit style weather widget designed for your desktop. <h3>


# Features

- It's transparent background allows it to blend in with your current setup
- Always stays on your desktop so it won't get in your way. This means it's hidden when you switch windows with `alt+tab`
- Switch between dark mode and light mode, for lighter and darker backgrounds respectively.
- Clean interface, with no clutter, all options can be accessed by right clicking.

# How to use
- Install the package with `npm install`.
- Sign up and get your API key from the [`Dark Sky`](https://darksky.net/dev) console.
- When you open the app for the first time, a settings menu pops up, paste your API key there.
- You can also change how often the weather is updated.
- After submitting the settings, right click, refresh and wait for the weather to update.
- You can choose where to place the widget by choosing from the Position menu.
- The menu can be accessed by right clicking anywhere on the widget.

## Known Issues
- Sometimes on startup, the background becomes black, instead of transparent. This can be resolved by closing and restarting the application.
- The widget can be built for Windows, but the application won't stick to your desktop. This is because the `desktop` window type in electron only works on X11 and Linux systems.
- Sometimes the widget takes too long to load the weather, in that case check your internet connection, and try refreshing a couple of times. 

## To uninstall
Run this in the terminal
```
sudo apt-get remove pixelweather
```

## Other cool things I made
- [Dusk Player](https://github.com/Aveek-Saha/MusicPlayer): A minimalistic music player, designed for simplicity.
- [YTDX](https://github.com/Aveek-Saha/ytdx): A YouTube audio downloader
- [Hasty Heroes](https://github.com/Aveek-Saha/HastyHeroes): An endless 2D jumping game

## Credits
- This widget is [Powered by Dark Sky](https://darksky.net/poweredby/)
- Settings menu components are from [NES.css](https://nostalgic-css.github.io/NES.css/)
- <div>Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
- <div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
