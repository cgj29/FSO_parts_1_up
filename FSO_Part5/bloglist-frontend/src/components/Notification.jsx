const Notification = ({ notificationObject }) => {
  if (!notificationObject) {
    return null
  } else if (notificationObject) {
    const { message, status } = notificationObject
    if (status === 'error') {
      return (
        <div className='error'>{message}</div>
      )
    } else if (status === 'alert'){
      return (
        <div className='alert'>{message}</div>
      )
    }
  }

}

export { Notification }