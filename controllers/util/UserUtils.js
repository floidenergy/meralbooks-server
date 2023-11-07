const preprareUser = (user) => {

  user.email = undefined
  user.confirmedEmail = undefined
  user.isAdmin = undefined
  user.hash = undefined
  user.salt = undefined
  user.accountHistory = undefined
  user.created_at = undefined
  user.__v = undefined
  user.dob = undefined
  user.shippingInfo = undefined
  user.orderHistory = undefined
  
  return user;
}

module.exports = { preprareUser }