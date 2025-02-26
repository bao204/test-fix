module.exports = {
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',  // Định nghĩa đường dẫn bạn muốn proxy
        destination: 'http://localhost:3000/uploads/:path*',  // Đường dẫn của server NestJS phục vụ ảnh
      },
    ];
  },
};
