import { useState } from 'react';
import { Slider, Checkbox, Input, Button } from '@nextui-org/react';

import SearchIcon from '../../Assets/searchIcon';
import FilterIcon from '../../Assets/filterIcon';

import Container from "./Container";

function FilterPanel({ filters, onFiltersChange }) {
    const [isFilterVisible, setFilterVisible] = useState(false);

    const handlePriceChange = (values) => {
        console.log('Price changed:', values);
        onFiltersChange({ ...filters, min_price: values[0], max_price: values[1] });
    };

    const handleFloatChange = (values) => {
        console.log('Float changed:', values);
        onFiltersChange({ ...filters, min_float: values[0], max_float: values[1] });
    };

    const handleStattrakChange = (event) => {
        console.log('Stattrak changed:', event.target.checked);
        onFiltersChange({ ...filters, stattrak: event.target.checked });
    };

    const handleNameChange = (event) => {
        console.log('Name changed:', event.target.value);
        onFiltersChange({ ...filters, name: event.target.value });
    };

    const toggleFilterVisibility = () => {
        setFilterVisible(!isFilterVisible);
    };

    return (
        <Container className='mt-16'>
            <Container className={`pt-4 pb-4 bg-black mx-auto bg-opacity-15 ${isFilterVisible ? 'block' : 'hidden'} md:block`}>
                <form className="md:flex md:justify-center md:items-center">
                    <Container className='w-9/12 sm:w-8/12 md:w-4/12 md:mx-5 lg:w-3/12 lg:mx-10 lg:mb-0 xl:w-[20%] xl:mr-10 mb-3 mx-auto'>
                        <Slider
                            label={<span className="font-semibold">Price</span>}
                            color='primary'
                            step={50}
                            minValue={0}
                            maxValue={20000}
                            defaultValue={[0, 20000]}
                            formatOptions={{ style: "currency", currency: "USD" }}
                            className="max-w-md text-black mx-auto lg:mx-0"
                            onChangeEnd={handlePriceChange} />
                    </Container>
                    <Container className='w-9/12 sm:w-8/12 md:w-4/12 md:mr-2 lg:w-3/12 lg:mr-10 lg:mb-0 xl:w-[20%] xl:ms-0 xl:mr-10 mb-3 mx-auto'>
                        <Slider
                            label={<span className="font-semibold">Float</span>}
                            color='primary'
                            step={0.001}
                            minValue={0}
                            maxValue={1}
                            defaultValue={[0, 1]}
                            className="max-w-md text-black mx-auto lg:mx-0"
                            onChangeEnd={handleFloatChange} />
                    </Container>
                    <Container className='w-9/12 sm:w-8/12 md:w-2/12 md:mx-3 lg:w-2/12 lg:mx-0 lg:my-0 lg:mb-0 xl:w-2/12 xl:mx-0 my-5 flex items-center justify-center mx-auto'>
                        <Checkbox
                            radius="none"
                            onChange={handleStattrakChange}
                            className='font-semibold'>
                            Stattrak<sup className="text-xs">TM</sup>
                        </Checkbox>
                    </Container>
                    <Container className='w-9/12 sm:w-8/12 md:w-4/12 md:mr-3 lg:w-3/12 lg:mr-10 xl:w-[20%] xl:ms-10 mx-auto mt-5 mb-7 flex items-center'>
                        <Input
                            label="Search"
                            isClearable
                            radius="lg"
                            classNames={{
                                label: "text-black/50 dark:text-white/90",
                                input: [
                                    "bg-transparent",
                                    "text-black/90 dark:text-white/90",
                                    "placeholder:text-default-700/50 dark:placeholder:text-white/60"
                                ],
                                innerWrapper: "bg-transparent",
                                inputWrapper: [
                                    "shadow-xl",
                                    "bg-white",
                                    "dark:bg-default/60",
                                    "backdrop-blur-xl",
                                    "backdrop-saturate-200",
                                    "hover:bg-default-200/70",
                                    "dark:hover:bg-default/70",
                                    "group-data-[focused=true]:bg-default-200/50",
                                    "dark:group-data-[focused=true]:bg-default/60",
                                    "!cursor-text",
                                ],
                            }}
                            placeholder="Type to search..."
                            startContent={
                                <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                            }
                            onChange={handleNameChange} />
                    </Container>
                </form>
            </Container>
            <Container className="w-[94.5%] mt-10 flex justify-end">
                <Button color='primary' className="md:hidden mt-5 mb-5 px-7 rounded" onClick={toggleFilterVisibility}>
                    <FilterIcon /> Filters
                </Button>
            </Container>
        </Container>

    );
}

export default FilterPanel;