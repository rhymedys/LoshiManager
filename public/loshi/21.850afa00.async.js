webpackJsonp([21], {
  '/HxN': function(e, t, a) {
    'use strict';
    var c = a('L3Nv');
    a.n(c);
  },
  CLwA: function(e, t) {
    e.exports = {
      result: 'result___3id33',
      icon: 'icon___1vICE',
      success: 'success___2oDZy',
      error: 'error___350hN',
      title: 'title___3qVcV',
      description: 'description___2hwMz',
      extra: 'extra___fYrGu',
      actions: 'actions___2dcQ5',
    };
  },
  FFET: function(e, t, a) {
    'use strict';
    function c(e) {
      var t = e.className,
        a = e.type,
        c = e.title,
        s = e.description,
        r = e.extra,
        n = e.actions,
        l = u()(e, ['className', 'type', 'title', 'description', 'extra', 'actions']),
        m = {
          error: i.a.createElement(_.a, { className: E.a.error, type: 'close-circle' }),
          success: i.a.createElement(_.a, { className: E.a.success, type: 'check-circle' }),
        },
        p = d()(E.a.result, t);
      return i.a.createElement(
        'div',
        o()({ className: p }, l),
        i.a.createElement('div', { className: E.a.icon }, m[a]),
        i.a.createElement('div', { className: E.a.title }, c),
        s && i.a.createElement('div', { className: E.a.description }, s),
        r && i.a.createElement('div', { className: E.a.extra }, r),
        n && i.a.createElement('div', { className: E.a.actions }, n)
      );
    }
    Object.defineProperty(t, '__esModule', { value: !0 });
    var s = (a('5qb1'), a('ahXh')),
      r = a('pgxq'),
      i = a.n(r),
      n = a('Vaaz'),
      l = a('y6ix'),
      o = a.n(l),
      _ = (a('/HxN'), a('eTxY')),
      m = a('nvWH'),
      u = a.n(m),
      p = a('ZQJc'),
      d = a.n(p),
      v = a('CLwA'),
      E = a.n(v),
      N = a('c6bg'),
      x = a.n(N),
      y = i.a.createElement(
        'div',
        { className: x.a.actions },
        i.a.createElement(
          'a',
          { href: '' },
          i.a.createElement(s.a, { size: 'large', type: 'primary' }, '\u67e5\u770b\u90ae\u7bb1')
        ),
        i.a.createElement(
          n.Link,
          { to: '/' },
          i.a.createElement(s.a, { size: 'large' }, '\u8fd4\u56de\u9996\u9875')
        )
      );
    t.default = function(e) {
      var t = e.location;
      return i.a.createElement(c, {
        className: x.a.registerResult,
        type: 'success',
        title: i.a.createElement(
          'div',
          { className: x.a.title },
          '\u4f60\u7684\u8d26\u6237\uff1a',
          t.state ? t.state.account : 'AntDesign@example.com',
          ' \u6ce8\u518c\u6210\u529f'
        ),
        description:
          '\u6fc0\u6d3b\u90ae\u4ef6\u5df2\u53d1\u9001\u5230\u4f60\u7684\u90ae\u7bb1\u4e2d\uff0c\u90ae\u4ef6\u6709\u6548\u671f\u4e3a24\u5c0f\u65f6\u3002\u8bf7\u53ca\u65f6\u767b\u5f55\u90ae\u7bb1\uff0c\u70b9\u51fb\u90ae\u4ef6\u4e2d\u7684\u94fe\u63a5\u6fc0\u6d3b\u5e10\u6237\u3002',
        actions: y,
        style: { marginTop: 56 },
      });
    };
  },
  c6bg: function(e, t) {
    e.exports = {
      registerResult: 'registerResult___Sb98S',
      title: 'title___1e5HC',
      actions: 'actions___3Fdhv',
    };
  },
});
