import { Spinner } from 'reactstrap'

function loadingSymbol({ size, less }) {
  return (
    <div>
      <Spinner type="grow" color="primary" size={size} />
      <Spinner type="grow" color="success" size={size} />
      <Spinner type="grow" color="danger" size={size} />
      <Spinner type="grow" color="warning" size={size} />
      <Spinner type="grow" color="info" size={size} />
      <Spinner type="grow" color="primary" size={size} />
      <Spinner type="grow" color="success" size={size} />
      {!less && (
        <>
          <Spinner type="grow" color="danger" size={size} />
          <Spinner type="grow" color="warning" size={size} />
          <Spinner type="grow" color="info" size={size} />
          <Spinner type="grow" color="primary" size={size} />
          <Spinner type="grow" color="success" size={size} />
          <Spinner type="grow" color="danger" size={size} />
          <Spinner type="grow" color="warning" size={size} />
        </>
      )}
    </div>
  )
}

export default loadingSymbol
