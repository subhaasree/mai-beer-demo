import React from 'react'

function Radio(props) {
    const { text, image, style_type, color_code, onChange, value, selected_value, ...rest } = props;
    const isChecked = selected_value === value;
    return (
        <label
            className={`radio ${style_type} ${isChecked ? 'checked' : ''}`}
        >
            <span className='radio-label-group' style={{ backgroundColor: color_code }}>
                <input
                    type='radio'
                    value={value}
                    {...rest}
                    onChange={() => {
                        onChange(value)
                    }}
                    checked={isChecked}
                />
                {
                    image && (
                        <img className={`radio-image ${color_code ? 'colored' : ''}`} src={image} alt="icon"/>
                    )
                }
                {
                    style_type === 'text_image' || style_type === 'text' ? (
                        <span style={{ color: color_code }} className='radio-label'>{text}</span>
                    ) : null
                }
            </span>
            {
                style_type === 'image_small' && (
                    <span style={{ color: color_code }} className='radio-label'>{text}</span>
                )
            }
        </label>
    )
}

Radio.defaultProps = {
    style_type: 'text_image'
}

function RadioGroup(props) {
    const { options, onChange, type, name, row, selected_value } = props;
    return (
        <div className='radiogroup'>
            {
                options.map(({ answer, server_value, url, color_code }, index) => {
                    return (
                        <>
                            {
                                (index) % row === 0 && (
                                    <div className="row-break" />
                                )
                            }
                            <Radio
                                key={`${name}_${index}`}
                                text={answer}
                                value={server_value}
                                onChange={onChange}
                                name={name}
                                image={url}
                                color_code={color_code}
                                style_type={type}
                                selected_value={selected_value}
                            />
                        </>
                    )
                })
            }
        </div>
    )
}

RadioGroup.defaultProps = {
    name: 'radioGroup',
    options: [],
    onChange: () => {}
}

export default RadioGroup;