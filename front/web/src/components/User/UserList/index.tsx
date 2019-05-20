import React from "react";
import {Table} from "@material-ui/core";
import TableHead from "@material-ui/core/es/TableHead";
import TableRow from "@material-ui/core/es/TableRow";
import TableCell from "@material-ui/core/es/TableCell";
import TableBody from "@material-ui/core/es/TableBody";
import TableSortLabel from "@material-ui/core/es/TableSortLabel";
import withConnect from "../../../App/Drawer/withConnect";
import {User} from "../../../domain/user";
import withStyles, {WithStyles} from "@material-ui/core/es/styles/withStyles";
import createStyles from "@material-ui/core/es/styles/createStyles";

export type Order = 'asc' | 'desc';
export type OrderBy = 'pub' | 'name';

// @ts-ignore
interface Props {
  list: User[]
  classes: {
    tableWrapper: string;
  }
}

interface State {
    order: Order,
    orderBy: OrderBy
}

function stableSort(array: User[], cmp: (a: any, b: any) => number): User[] {
    const stabilizedThis = array.map((el, index) => [el, index]);
    // @ts-ignore
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        // @ts-ignore
        return a[1] - b[1];
    });
    // @ts-ignore
    return stabilizedThis.map(el => el[0]);
}

function desc(a: any, b: any, orderBy: string): number {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getSorting(order: string, orderBy: string): (a: any, b: any) => number {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const styles = () => createStyles({
    tableWrapper: {
        overflowX: "hidden"
    }
});

class UserList extends React.Component<Props, State> {

    state: { orderBy: OrderBy; order: Order } = { order: 'desc', orderBy:'name'};

    render() {
        const {list} = this.props;
        const {order, orderBy} = this.state;
        return (
            <div className={this.props.classes.tableWrapper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                        <TableSortLabel
                            active={orderBy === 'name'}
                            direction={order}
                            onClick={this.createSortHandler('name')}
                        >Name</TableSortLabel>
                        </TableCell>
                        <TableCell>
                        <TableSortLabel
                            active={orderBy === 'pub'}
                            direction={order}
                            onClick={this.createSortHandler('pub')}
                        >Nb Session</TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stableSort(list, getSorting(order, orderBy))
                        .map(user => (
                            <TableRow key={user.name}>
                                <TableCell component="th" scope="row">
                                    {user.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <div>{user.pub}</div>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            </div>
        );
    }

    createSortHandler = (property: OrderBy) => () => {
        this.handleRequestSort(property);
    };

    handleRequestSort = (property: OrderBy) => {
        const orderBy :OrderBy = property;
        let order: Order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({order: order, orderBy: orderBy});
    };

}

export default withConnect(withStyles(styles)(UserList));
