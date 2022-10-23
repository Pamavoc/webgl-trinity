type Callback = {
  name: string;
  callback: Function;
};

class RAF {
  callbacks: Callback[] = [];

  constructor() {
    this.play();
  }

  subscribe = (name: string, callback: Function) => {
    this.callbacks.push({
      name,
      callback,
    });
  };

  unsubscribe = (name: string) => {
    this.callbacks.forEach((item, i) => {
      if (item.name == name) this.callbacks.splice(i, i + 1);
    });
  };

  frame(past?, now = null) {
    now = now || performance.now();
    const last = past || now;
    const d = (now - last) * (60 / 1000); // normalize at 60fps

    this.callbacks.forEach(item => {
      item.callback(d);
    });

    requestAnimationFrame(() => this.frame(this, now));
  }

  play() {
    requestAnimationFrame(() => this.frame());
  }
}
export default RAF;
