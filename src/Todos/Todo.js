import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import globalClasses from "./styles";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import classnames from "classnames";
import Checkbox from "./checkbox";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import AddCheckbox from "./addCheckbox";
import { todosContext } from "../contexts";
const styles = globalClasses;
class Todo extends React.Component {
  state = {
    expanded: false,
    openConfig: null,
    editMode: false,
    removeMode: false,
    title: this.props.title
  };
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  handleClickConfig = event => {
    this.setState({ openConfig: event.currentTarget });
  };

  handleCloseConfig = () => {
    this.setState({ openConfig: null });
  };
  afterEdit = () => {
    this.setState({ editMode: false });
  };
  closeRemoveMode = () => {
    this.setState({ removeMode: false });
  };
  render() {
    const { classes, id } = this.props;
    const { openConfig, expanded, editMode, title, removeMode } = this.state;
    return (
      <Card className={classes.card}>
        <Dialog open={removeMode} onClose={this.closeRemoveMode}>
          <DialogTitle id="alert-dialog-title">
            Deseja realmente excluir?
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={() =>
                this.setState({ removeMode: false, title: this.props.title })
              }
              color="primary"
            >
              Cancelar
            </Button>
            <todosContext.Consumer>
              {({ deleteTodo }) => (
                <Button
                  variant="contained"
                  onClick={() => {
                    deleteTodo(id);
                    this.closeRemoveMode();
                  }}
                  color="primary"
                  autoFocus
                >
                  Excluir
                </Button>
              )}
            </todosContext.Consumer>
          </DialogActions>
        </Dialog>
        <CardContent className={classnames(classes.cardContent, classes.todo)}>
          {editMode ? (
            <>
              <form
                className={classes.form}
                onSubmit={() => console.log("alo")}
              >
                <TextField
                  autoFocus={true}
                  className={classes.textField}
                  value={title}
                  onChange={this.handleChange("title")}
                />
              </form>
              <div className={classes.todoButtons}>
                <IconButton aria-label="cancelar" onClick={this.afterEdit}>
                  <CancelIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  aria-label="salvar"
                  onClick={this.afterEdit}
                >
                  <SaveIcon />
                </IconButton>
              </div>
            </>
          ) : (
            <>
              <Typography
                onClick={this.handleExpandClick}
                className={classes.todoTitle}
              >
                {this.props.title}
              </Typography>
              <div className={classes.todoButtons}>
                <IconButton
                  aria-owns={openConfig ? "simple-menu" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleClickConfig}
                >
                  <MoreVertIcon />
                </IconButton>
                {/* <IconButton aria-label="excluir">
              <DeleteIcon />
            </IconButton> */}
                <IconButton
                  onClick={this.handleExpandClick}
                  className={classnames(classes.expand, {
                    [classes.expandOpen]: expanded
                  })}
                  aria-expanded={expanded}
                  aria-label="Show more"
                >
                  <ExpandMoreIcon
                    className={classes.todoIcon}
                    fontSize="small"
                  />
                </IconButton>
              </div>
            </>
          )}

          <ClickAwayListener onClickAway={this.handleCloseConfig}>
            <Menu
              anchorEl={openConfig}
              id="simple-menu"
              open={Boolean(openConfig)}
              onClose={this.handleCloseConfig}
            >
              <MenuItem
                onClick={() => {
                  this.handleCloseConfig();
                  this.setState({ editMode: true });
                }}
              >
                Editar
              </MenuItem>
              <MenuItem
                onClick={() =>
                  this.setState({ removeMode: true, openConfig: false })
                }
              >
                Excluir
              </MenuItem>
            </Menu>
          </ClickAwayListener>
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent className={classes.checks}>
            {this.props.checkboxes.map(item => (
              <Checkbox key={item.id} {...item} />
            ))}
            <AddCheckbox todoId={id} />
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string,
  classes: PropTypes.object.isRequired,
  checkboxes: PropTypes.array
};
Todo.defaultProps = {
  checkboxes: []
};
export default withStyles(styles)(Todo);
