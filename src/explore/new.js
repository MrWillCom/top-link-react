useEffect(() => {
  // 检查当前页码是否等于总页数
  if (page === totalPages) {
    // 如果是，则设置 hasMore 为 false，表示没有更多数据
    setHasMore(false);
  }
}, [page, totalPages]);

return (
  <div>
    {items.map((item) => (
      <div key={item.id}>{item.name}</div>
    ))}
    {!hasMore && <div>没有更多数据</div>}
  </div>
);
useEffect(() => {
  // 调用后端接口，获取当前页的数据
  fetch(`https://my-api.com/items?page=${page}&pageSize=${pageSize}`)
    .then((response) => response.json())
    .then((data) => {
      // 更新 items 数组
      setItems((prevItems) => [...prevItems, ...data.items]);
      // 更新总页数
      setTotalPages(data.totalPages);
    });
}, [page, pageSize]);

useEffect(() => {
  // 监听滚动事件
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

const handleScroll = () => {

};

