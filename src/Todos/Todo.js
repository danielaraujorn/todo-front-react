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
// import Grow from "@material-ui/core/Grow";
// import Paper from "@material-ui/core/Paper";
// import Popper from "@material-ui/core/Popper";
// import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import AddCheckbox from "./addCheckbox";
const styles = globalClasses;
class Todo extends React.Component {
  state = {
    expanded: false,
    openConfig: null,
    editMode: false,
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
  render() {
    const { classes, id } = this.props;
    const { openConfig, expanded, editMode, title } = this.state;
    return (
      <Card className={classes.card}>
        <CardContent className={classnames(classes.cardContent, classes.todo)}>
          {editMode ? (
            <>
              <TextField
                autoFocus={true}
                className={classes.textField}
                value={title}
                onChange={this.handleChange("title")}
              />
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
              <MenuItem onClick={this.handleCloseConfig}>Excluir</MenuItem>
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
