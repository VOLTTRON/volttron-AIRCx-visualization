const styles = (theme) => {
  return {
    root: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      overflowX: "hidden",
    },
    toolbar: theme.mixins.toolbar,
  };
};

export default styles;
