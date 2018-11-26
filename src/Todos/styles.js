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
    padding: 10,
    flexDirection: "column"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  todo: {
    paddingRight: 10,
    paddingLeft: 30,
    display: "flex",
    alignItems: "center"
  },
  todoTitle: {
    cursor: "pointer",
    fontSize: 16,
    color: theme.palette.primary.dark
  },
  todoIcon: {
    color: theme.palette.primary.dark
  },
  checkboxContainer: {
    paddingLeft: 15,
    paddingRight: 10,
    marginBottom: 5,
    display: "flex",
    alignItems: "center",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#0000000d"
  },
  todoButtons: {
    marginLeft: "auto"
  },
  buttonSave: {
    marginTop: 6,
    marginBottom: 6
  },
  textField: {
    width: "100%"
  }
});
