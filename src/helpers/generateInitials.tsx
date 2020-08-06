export function generateInitials(userInfo = ''): string {
  if (userInfo.indexOf(' ') > -1) {
    // from full name.
    const fullnameInitials = userInfo
      .split(' ')
      .map((name: string) => name[0])
      .slice(0, 2)
      .join('');
    return fullnameInitials;
  }
  if (userInfo.indexOf('@') > -1) {
    // from Email.
    const emailInitials = userInfo
      .split('@')
      .map((name: string) => name[0])
      .slice(0, 2)
      .join('');
    return emailInitials;
  }
  if (userInfo.indexOf('+') > -1) {
    // from Phone number e.164 format.
    const phonenrIntials = userInfo.slice(-2);
    return phonenrIntials;
  } // from one name
  const nameInitials = userInfo.charAt(0);
  return nameInitials;
}
