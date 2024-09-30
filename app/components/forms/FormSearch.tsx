'use client';
import { Input } from '@/components/ui/input';
import { useSelector, useDispatch } from 'react-redux';
import { setInputValue, FormValues } from '@/store/formStore';
import { RootState } from '@/store/index';
import { Label } from '@/components/ui/label';

const FormSearch = () => {
	const dispatch = useDispatch();
	const { inputSearch } = useSelector((state: RootState) => state.form.values);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		dispatch(setInputValue({ field: name as keyof FormValues, value })); // Type assertion
	};

	return (
		<div>
			<form action="" className="relative flex-center w-full">
				<Label>Search</Label>
				<Input
					name="inputSearch" // Ensure name matches FormValues
					type="text"
					placeholder="Search"
					onChange={handleChange}
					value={inputSearch}
				/>
			</form>
		</div>
	);
};

export default FormSearch;
