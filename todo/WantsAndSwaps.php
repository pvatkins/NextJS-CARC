<!DOCTYPE html>
<html lang="en">
<head>
	<title>WantsAndSwaps.php</title>
	<meta charset="UTF-8">
	<link href="css/Layout.css" media="all" rel="stylesheet">
	<link href="css/WantsAndSwaps.css" media="all" rel="stylesheet">
	<style>
		#garagesale {
		  color: red;
		  font-size:1.3em;
		  font-weight:bold;
		  font-style: italic;
			padding-bottom: 0;
			margin-bottom: 0;
		}
	</style>
</head>

<body>
	<table>

		<tr> <!-- Top Row -->
			<td colspan="2">
				<div class="header">
					<?php include '../includes/CommonHeader.php' ?>
					<img class="center" src="../images/wantsandswaps_blitz110_bnr.gif" height="60" alt="AboutCARC">
				</div> <!-- header end -->
			</td>
		</tr>

		<tr><!-- Center Row -->
			<td class="col1">
				<div class="leftcol">
					<?php include '../includes/CommonMenu.php' ?>
				</div> <!-- leftcol End -->
			</td>
			<td class="col2">
				<div class="rightcol">
					<table>
						<tr>
							<p>No Current Wants/Swaps</p>
						</tr>
					</table>
				</div>
			</td>
		</tr>

		<tr> <!-- Bottom Row -->
			<td colspan="2">
				<div class="bottom">
	        <?php include '../includes/CommonFooter.php'; ?>
	      </div> <!-- bottom end -->
			</td>
		</tr> <!-- end Bottom Row -->

	</table>
</body>
</html>
