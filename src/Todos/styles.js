export default theme => ({
  card: {
    minWidth: 275,
    maxWidth: 800,
    margin: "5px auto"
  },
  cardContent: {
    padding: 10,
    paddingBottom: "10px !important"
  },
  checks: {
    display: "flex",
    padding: 10
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  todo: {
    cursor: "pointer",
    paddingRight: 10,
    paddingLeft: 30,
    display: "flex",
    alignItems: "center"
  },
  todoTitle: {
    fontSize: 16,
    color: theme.palette.primary.dark
  },
  todoIcon: {
    color: theme.palette.primary.dark
  },
  checkboxContainer: {
    padding: 5,
    margin: 0,
    cursor: "pointer",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#0000000a",
    width: "100%"
  }
});
