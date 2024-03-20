1. sudo vim /etc/hosts
2. 127.0.0.1       beta.mysite.live
3. chrome://net-internals/#hsts
4. delete beta.mysite.live
5. chrome://flags/#unsafely-treat-insecure-origin-as-secure
6. add domain [beta.mysite.live](http://beta.mysite.live:9003)

## 1. Happy Flow 

#### a) Provide mandatory fields
```js
<LocateMe 
  googleKey="AIzaSyCimWLcCkTc03jZrTE6TxfTH0PauR2Keps" 
  isProdKey={false}
>
  Locate Me
</LocateMe>
```
> [!Note]
> Passing production googleKey require to pass isProdKey as a true.
