# demolocation

![sample demo](https://github.com/mechazod/demolocation/blob/main/demosample.png)

#### Library Used
- react-native-permissions ^2.0.0

- react-native 0.64.1

- react-native-maps ^0.31.1

- @react-native-community/geolocation ^2.1.0


#### Limitation for Testing

- On release mode, GPS/Location status cannot be spoof/altered in real scenario but there are devices needed to do it
Dongle for 3.5 jack headset or lightning cable [https://www.gfaker.com/](https://www.gfaker.com/) [https://www.virtuallocation.com/fake-location/best-fake-gps-location-spoofer.html](https://www.virtuallocation.com/fake-location/best-fake-gps-location-spoofer.html)


- On Android, can install apps or use third-party pc/desktop apps to change location but need to enable USB debugging on developer options [https://www.youtube.com/watch?v=X4pOYPXvQjY](https://www.youtube.com/watch?v=X4pOYPXvQjY)

 

##### Do’s
- Ask permission to access the location
- Start observing if your app needs location data and once you have what you need stop observing

##### Don’t
- If your app does not need location, stop observing

