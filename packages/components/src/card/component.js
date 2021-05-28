/**
 * External dependencies
 */
import { css } from 'emotion';

/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { contextConnect, ContextSystemProvider } from '../ui/context';
import { Elevation } from '../elevation';
import { View } from '../view';
import * as styles from './styles';
import { useCard } from './hook';
import CONFIG from '../utils/config-values';

/**
 * @param {import('../ui/context').PolymorphicComponentProps<import('./types').Props, 'div'>} props
 * @param {import('react').Ref<any>} forwardedRef
 */
function Card( props, forwardedRef ) {
	const {
		children,
		elevation,
		isBorderless,
		isRounded,
		size,
		...otherProps
	} = useCard( props );
	const elevationBorderRadius = isRounded ? CONFIG.cardBorderRadius : 0;

	const elevationClassName = useMemo(
		() => css( { borderRadius: elevationBorderRadius } ),
		[ elevationBorderRadius ]
	);

	const contextProviderValue = {
		CardBody: {
			size,
			isBorderless,
		},
		CardHeader: {
			size,
			isBorderless,
		},
		CardFooter: {
			size,
			isBorderless,
		},
	};

	return (
		<ContextSystemProvider value={ contextProviderValue }>
			<View { ...otherProps } ref={ forwardedRef }>
				<View className={ styles.Content }>{ children }</View>
				<Elevation
					className={ elevationClassName }
					isInteractive={ false }
					value={ elevation ? 1 : 0 }
				/>
				<Elevation
					className={ elevationClassName }
					isInteractive={ false }
					value={ elevation }
				/>
			</View>
		</ContextSystemProvider>
	);
}

/**
 * `Card` is a layout component, providing a flexible and extensible content container.
 *
 * `Card` provides convenient sub-components such as `CardBody`, `CardHeader`, and `CardFooter`.
 *
 * @example
 * ```jsx
 * import {
 *   Card,
 *   CardHeader,
 *   CardBody,
 *   CardFooter,
 *   Text,
 *   Heading,
 * } from `@wordpress/components`;
 *
 * function Example() {
 *   return (
 *     <Card>
 *       <CardHeader>
 *         <Heading size={ 4 }>Card Title</Heading>
 *       </CardHeader>
 *       <CardBody>
 *         <Text>Card Content</Text>
 *       </CardBody>
 *       <CardFooter>
 *         <Text>Card Footer</Text>
 *       </CardFooter>
 *     </Card>
 *   );
 * }
 * ```
 */
const ConnectedCard = contextConnect( Card, 'Card' );

export default ConnectedCard;
