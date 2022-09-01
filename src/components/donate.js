export function DonatePayPal() {
  return (
    <div>
      <form action="https://www.paypal.com/donate" method="post" target="_top">
        <input type="hidden" name="business" value="D5GB3NM27HCG2" />
        <input type="hidden" name="no_recurring" value="0" />
        <input type="hidden" name="currency_code" value="USD" />
        <input
          type="image"
          src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif"
          border="0"
          name="submit"
          title="PayPal - The safer, easier way to pay online!"
          alt="Donate with PayPal button"
        />
        <img
          alt=""
          border="0"
          src="https://www.paypal.com/en_US/i/scr/pixel.gif"
          width="1"
          height="1"
        />
      </form>
    </div>
  );
}

export function DonateKofi() {
  return (
    <a href="https://ko-fi.com/P5P6BVZ4S" target="_blank">
      <img
        height="36"
        style={{border:"0px", height:"36px"}}
        src="https://cdn.ko-fi.com/cdn/kofi4.png?v=3"
        border="0"
        alt="Buy Me a Coffee at ko-fi.com"
      />
    </a>
  );
}
