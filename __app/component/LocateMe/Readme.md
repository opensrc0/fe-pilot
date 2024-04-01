## Setup to test LocateMe at local

1. sudo vim /etc/hosts
2. 127.0.0.1       www.mysite.com
3. chrome://net-internals/#hsts
4. delete www.mysite.com
5. chrome://flags/#unsafely-treat-insecure-origin-as-secure
6. add domain [www.mysite.com](http://www.mysite.com:9003) and enbale **Insecure origins treated as secure**

## 1. Happy Flow 

#### a) Provide mandatory fields
```js
<LocateMe 
  googleKey="Require Google Map Key" 
  isProdKey={false}
>
  Locate Me
</LocateMe>
```
> [!Note]
> Passing production googleKey require to pass isProdKey as a true.
