const Loader = () => {
  return (
    <div className="website-loading">
      <div className="load-pict">
        <img src="/images/loading.webp" alt="loading..." loading="lazy" />
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default Loader;
