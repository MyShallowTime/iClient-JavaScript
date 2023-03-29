export const MathUtil = {
    /**
     * 加法
     * @param {Number} a 加数
     * @param {Number} b 加数
     * @returns
     */
    accAdd(a, b) {
      let m, n, x; // a的小数位数，b的小数位数，放大倍数
      try {
        m = a.toString().split(".")[1].length;
      } catch (e) {
        m = 0;
      }
      try {
        n = b.toString().split(".")[1].length;
      } catch (e) {
        n = 0;
      }
      x = Math.max(m, n);
      const transform = (num) => +num.toFixed(x).toString().replace(".", "");
      return (transform(+a) + transform(+b)) / 10 ** x;
    },
   // 减法
    accSub(a, b) {
      return this.accAdd(a, -b);
    },
  // 乘法
    accMul(a, b) {
      let x = 0,
        a_str = a.toString(),
        b_str = b.toString();
      try {
        x += a_str.split(".")[1].length;
      } catch (e) {
        console.log('error number');
      }
      try {
        x += b_str.split(".")[1].length;
      } catch (e) {
        console.log('error number');
      }
  
      return (+a_str.replace(".", "") * +b_str.replace(".", "")) / 10 ** x;
    },
  // 除法
    accDiv(a, b) {
      let x = 0,
        y = 0,
        a_str = a.toString(),
        b_str = b.toString(),
        a_mul = +a_str.replace(".", ""),
        b_mul = +b_str.replace(".", "");
      try {
        x = a_str.split(".")[1].length;
      } catch (e) {
        console.log('error number');
      }
      try {
        y = b_str.split(".")[1].length;
      } catch (e) {
        console.log('error number');
      }
      return (a_mul / b_mul) * 10 ** (y - x);
    }
  };