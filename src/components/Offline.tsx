function Offline() {
  if (!navigator.onLine) {
    return (
      <div className="container rounded gx-0 gy-0">
        <div className="row rounded danger-bg">
          <p className="p-2 m-0 dark-text">
            You're offline, some functionality might not work
          </p>
        </div>
      </div>
    );
  }
}

export default Offline;
