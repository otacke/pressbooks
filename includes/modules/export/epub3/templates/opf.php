<?php

// @see: \PressBooks\Export\Export loadTemplate()

if ( ! defined( 'ABSPATH' ) )
	exit;

echo '<?xml version="1.0" encoding="UTF-8" ?>' . "\n";
?>
<package version="3.0" xmlns="http://www.idpf.org/2007/opf" unique-identifier="PrimaryID">


	<metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf">
		<?php
		// Required, Title
		echo '<dc:title>' . ( ! empty( $meta['pb_title'] ) ? $meta['pb_title'] : get_bloginfo( 'name' ) ) . '</dc:title>';
		unset( $meta['pb_title'] );
		echo "\n";

		// Required, Language
		echo '<dc:language>' . ( ! empty( $meta['pb_language'] ) ? $meta['pb_language'] : 'en' ) . '</dc:language>';
		unset ( $meta['pb_language'] );
		echo "\n";

		// Required, Modification date
		//<meta property="dcterms:modified">2013-01-22T01:23:45Z</meta>
		echo '<meta property="dcterms:modified">' . ( date('Y-m-d\TH:i:s\Z') ) . '</meta>';
		echo "\n";
/*
		// Required, Primary ID
		if ( ! empty( $meta['pb_ebook_isbn'] ) ) {
			echo '<dc:identifier id="PrimaryID" opf:scheme="ISBN">' . $meta['pb_ebook_isbn'] . '</dc:identifier>';
		} else {
			echo '<dc:identifier id="PrimaryID" opf:scheme="URI">' . get_bloginfo( 'url' ) . '</dc:identifier>';
		}
*/
		// Required, Primary ID
		if ( ! empty( $meta['pb_ebook_isbn'] ) ) {
			echo '<dc:identifier id="PrimaryID">' . $meta['pb_ebook_isbn'] . '</dc:identifier>';
		} else {
			echo '<dc:identifier id="PrimaryID">' . get_bloginfo( 'url' ) . '</dc:identifier>';
		}

		unset( $meta['pb_ebook_isbn'] );
		echo "\n";

		// Pick best non-html description
		if ( ! empty( $meta['pb_about_50'] ) ) {
			echo "<dc:description>{$meta['pb_about_50']}</dc:description>\n";
			unset( $meta['pb_about_50'] );
		} elseif ( ! empty( $meta['pb_about_140'] ) ) {
			echo "<dc:description>{$meta['pb_about_140']}</dc:description>\n";
			unset( $meta['pb_about_140'] );
		}

		// Author
//		echo '<dc:creator opf:role="aut"';
		echo '<dc:creator';
		if ( ! empty( $meta['pb_author_file_as'] ) ) {
			echo ' opf:file-as="' . $meta['pb_author_file_as'] . '"';
		}
		echo '>';
		if ( ! empty( $meta['pb_author'] ) ) {
			echo $meta['pb_author'];
		} else {
			echo 'Authored by: ' . get_bloginfo( 'url' );
		}
		echo '</dc:creator>' . "\n";
		unset( $meta['pb_author_file_as'], $meta['pb_author'] );

		// Copyright
		if ( ! empty( $meta['pb_copyright_year'] ) || ! empty( $meta['pb_copyright_holder'] ) ) {
			echo '<dc:rights>';
			echo _( 'Copyright' ) . ' &#169; ';
			if ( ! empty( $meta['pb_copyright_year'] ) ) echo $meta['pb_copyright_year'] . ' ';
			if ( ! empty( $meta['pb_copyright_holder'] ) ) echo ' ' . __( 'by', 'pressbooks' ) . ' ' . $meta['pb_copyright_holder'];
			echo "</dc:rights>\n";
		}
		unset( $meta['pb_copyright_year'], $meta['pb_copyright_holder'] );

		// Rest of metadata
		foreach ( $meta as $key => $val ) {
			switch ( $key ) {

				case 'pb_publisher' :
					echo "<dc:publisher>$val</dc:publisher>\n";
					break;

				case 'pb_publication_date' :
					echo '<dc:date opf:event="publication">';
					echo date( 'Y-m-d', (int) $val );
					echo "</dc:date>\n";
					break;

				case 'pb_bisac_subject' :
					$subjects = explode( ',', $val );
					foreach ( $subjects as $subject ) {
						echo '<dc:subject>' . trim( $subject ) . "</dc:subject>\n";
					}
					break;

				default:
					// TODO: echo "<!-- $key, $val -->\n";
					break;
			}
		}

		// Required (for Kindle), Cover
		echo '<meta name="cover" content="cover-image" />' . "\n";
		?>
	</metadata>


	<manifest>
		<?php
		foreach ( $manifest as $k => $v ) {
			printf( '<item id="%s" href="OEBPS/%s" media-type="application/xhtml+xml" />', $k, $v['filename'] );
			echo "\n";
		}
		echo $manifest_images;
		echo $manifest_audios;
		echo $manifest_videos;
		?>
		<item id="toc" properties="nav" href="toc.xhtml" media-type="application/xhtml+xml"/>
		<?php if ( ! empty( $stylesheet ) ): ?><item id="stylesheet" href="OEBPS/<?php echo $stylesheet; ?>"  media-type="text/css" /><?php endif; ?>
	</manifest>


	<spine>
		<?php
		foreach ( $manifest as $k => $v ) {

			if ( 'front-cover' == $k ) $linear = 'no';
			else $linear = 'yes';

			printf( '<itemref idref="%s" linear="%s" />', $k, $linear );
			echo "\n";
		}
		?>
	</spine>


	<guide>
		<reference type="toc" title="Table of Contents" href="OEBPS/table-of-contents.html" />
		<reference type="cover" title="cover" href="OEBPS/front-cover.html" />
		<?php
		// First "real" page of content
		$keys = array_keys( $manifest );
		$position = array_search( 'table-of-contents', $keys );
		if ( isset( $keys[$position + 1] ) ) {
			$key = $keys[$position + 1];
			printf( '<reference type="text" title="%s" href="OEBPS/%s" />', $manifest[$key]['post_title'], $manifest[$key]['filename'] );
			echo "\n";
		}
		?>
	</guide>
</package>