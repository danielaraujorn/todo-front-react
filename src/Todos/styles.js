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
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
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
    paddingLeft: 24,
    display: "flex",
    alignItems: "center"
  },
  todoTitle: {
    cursor: "pointer",
    fontSize: 16,
    width: "100%",
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
    display: "flex",
    marginLeft: "auto"
  },
  buttonSave: {
    marginTop: 6,
    marginBottom: 6
  },
  form: {
    width: "100%"
  },
  textfield: { margin: 0, width: "100%" },
  paperAddTodo: {
    opacity: 0.8,
    transitionDuration: 300,
    "&:hover": {
      opacity: 1
    }
    // "&$cssFocused": {
    //   opacity: 1
    // },
    // "&:focus": {
    //   opacity: 1
    // }
  }
});
