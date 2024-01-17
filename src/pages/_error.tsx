function ErrorPage({ statusCode }: any) {
  return (
    <div>
      <h1>Error {statusCode}</h1>
      <p>An error occurred on the server.</p>
    </div>
  );
}

ErrorPage.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
