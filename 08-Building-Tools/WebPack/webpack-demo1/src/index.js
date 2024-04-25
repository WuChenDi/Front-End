import avatar from './avatar.jpg';
import style from './index.scss';
import createAvatar from './createAvatar.js';

createAvatar();

var img = new Image()
img.src = avatar;
img.classList.add(style.avatar);

document.getElementById('root');
root.append(img);