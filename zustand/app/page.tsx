'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const FilterComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();

    // 체크박스 옵션들
    const options = [
        { id: 'option1', label: '옵션 1' },
        { id: 'option2', label: '옵션 2' },
        { id: 'option3', label: '옵션 3' },
    ];

    // URL에서 현재 선택된 카테고리들 가져오기
    const getSelectedCategories = () => {
        const category = searchParams.get('category');
        return category ? category.split(',') : [];
    };

    // 체크박스 변경 핸들러
    const handleCheckboxChange = (optionId: string) => {
        const currentSelected = getSelectedCategories();
        let newSelected;

        if (currentSelected.includes(optionId)) {
            newSelected = currentSelected.filter((id: string) => id !== optionId);
        } else {
            newSelected = [...currentSelected, optionId];
        }

        // URL 업데이트
        const params = new URLSearchParams(searchParams.toString());
        if (newSelected.length > 0) {
            params.set('category', newSelected.join(','));
        } else {
            params.delete('category');
        }
        router.push(`?${params.toString()}`);
    };

    return (
        <div style={{ position: 'fixed', top: '50%', left: '50%' }} className="filter-container">
            <button onClick={() => setIsOpen(!isOpen)} className="filter-button">
                필터 {isOpen ? '닫기' : '열기'}
            </button>

            {isOpen && (
                <div className="checkbox-container">
                    {options.map((option) => (
                        <label key={option.id} className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={getSelectedCategories().includes(option.id)}
                                onChange={() => handleCheckboxChange(option.id)}
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FilterComponent;
