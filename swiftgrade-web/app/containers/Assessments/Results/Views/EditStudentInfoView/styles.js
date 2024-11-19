export const styles = () => ({
  date_container: {
    display: 'flex',
    height: 40,
    alignItems: 'center',
    margin: '20px 0 20px 10px',
  },
  date_title: {
    width: 120,
  },
  scan_image_container: {
    justifyContent: 'center',
    margin: 'auto',
    maxWidth: '520px',
    display: 'grid',
  },
  full_name_images: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  scan_image: {
    border: '1px solid #9e9e9e',
    margin: '30px 0px 15px 0px',
    maxWidth: 250,
    '&.email': {
      maxWidth: 520,
      margin: '15px 0px 20px 0px',
    },
  },
});
