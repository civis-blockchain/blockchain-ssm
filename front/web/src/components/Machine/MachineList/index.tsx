import React from "react";
import { Machine } from "../../../domain/machine";
import {Table} from "@material-ui/core";
import TableHead from "@material-ui/core/es/TableHead";
import TableRow from "@material-ui/core/es/TableRow";
import TableCell from "@material-ui/core/es/TableCell";
import TableBody from "@material-ui/core/es/TableBody";
import TableSortLabel from "@material-ui/core/es/TableSortLabel";
import withConnect from "../../../App/Drawer/withConnect";

export type Order = 'asc' | 'desc';
export type OrderBy = 'name' | 'sessions';


interface Props {
  list: Machine[],
  onMachineClick: (machine: Machine) => void,
}

interface State {
    order: Order,
    orderBy: OrderBy
}

function stableSort(array: Machine[], cmp: (a: any, b: any) => number): Machine[] {
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

class MachineList extends React.Component<Props, State> {

    state: { orderBy: OrderBy; order: Order } = { order: 'desc', orderBy:'sessions'};

    render() {
        const {list, onMachineClick} = this.props;
        const {order, orderBy} = this.state;
        return (
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
                            active={orderBy === 'sessions'}
                            direction={order}
                            onClick={this.createSortHandler('sessions')}
                        >Nb Session</TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stableSort(list, getSorting(order, orderBy))
                        .map(machine => (
                            <TableRow key={machine.name} onClick={() => {
                                onMachineClick(machine)
                            }}>
                                <TableCell component="th" scope="row">
                                    {machine.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {machine.sessions.length}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
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

export default withConnect(MachineList);
