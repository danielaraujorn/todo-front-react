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
import classnames from "classnames";
import Checkbox from "./checkbox";
const styles = globalClasses;
class Todo extends React.Component {
  state = { expanded: true };
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent
          onClick={this.handleExpandClick}
          className={classnames(classes.cardContent, classes.todo)}
        >
          <Typography className={classes.todoTitle}>
            {this.props.title}
          </Typography>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon className={classes.todoIcon} fontSize="small" />
          </IconButton>
        </CardContent>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent className={classes.checks}>
            {this.props.checkboxes.map(item => (
              <Checkbox key={item.id} {...item} />
            ))}
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
