# Notifloud

<h1 align="center">
  <br>
  <img src="banner.png" alt="enOne-logo" width="800">
  <br>
</h1>

<p align="center">Notifloud is minimal vanilla Javascript library for notifications and toasts</p>

## Demo 

- <a href="https://yrezehi.github.io/Notifloud/example">Live Demo</a>

## Installation

> **_NOTE:_**  The library is not ready or full-featured yet.

### Toast

1. Refrence `toast.css` to your page
2. Refrence `toast.js` to your page

### Usage

```javascript
NotifloudToast.success("Success !", "Write success message here");
```

### Notification

1. Refrence `notification.css` to your page
2. Refrence `notification.js` to your page

### Usage

```javascript
NotifloudNotification.set([{"title": "Followers", "description": "You got 7 new followers!"}]);
```

### TODO

- [ ] Provide configuration interface
- [ ] Dynamic notification data
- [ ] Cleanup code
- [ ] Dynamic positioning of toast and notification
- [ ] NPM package
