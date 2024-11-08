import { useDispatch } from 'react-redux';
import { requestDeleteTodoItem, requestEditTodoItem } from '../store/actions/todoActions';
import styles from './Item.module.css';

export const Item = ({ title, id }) => {
	const dispatch = useDispatch();

	const handleEdit = () => {
		dispatch(requestEditTodoItem(id, title));
	};

	const handleDelete = () => {
		if (window.confirm('Уверены что хотите удалить задачу?')) {
			dispatch(requestDeleteTodoItem(id));
		}
	};

	return (
		<li className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.title}>{title}</div>
				<button className={styles.editButton} onClick={handleEdit}>
					Ред.
				</button>
				<button className={styles.button} onClick={handleDelete}>
					X
				</button>
			</div>
		</li>
	);
};
