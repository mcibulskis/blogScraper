package Bingin;

use JSON;
use Data::Dumper;
use LWP::UserAgent;
use URI;

my $ua = new LWP::UserAgent;

my $json = join '', <DATA>;

my $block = from_json($json);

my %links;
my %matches;

my $first = sub {
    my ( $uri, $src ) = @_;
    return ( split m^/^, $uri->path )[1];
};
my $second = sub {
    my ( $uri, $src ) = @_;
    return ( split m^/^, $uri->path )[2];
};
my $strippers = {
    'www.facebook.com' => $first,
    'alpha.app.net'    => $first,
    'plus.google.com'  => $first,
    'www.linkedin.com' => $second,
    'twitter.com'      => $first,
    'www.twitter.com'  => $first,
};
foreach my $item ( @{ $block->{SearchResponse}{Web}{Results} } ) {
    my $r = $ua->get( $item->{Url} );
    warn "nogood " . $r->error_as_HTML and next unless $r->is_success;

    my $c = $r->content;
    $matches{ $item->{Url} } = [
        grep
/twitter\.com|facebook\.com|linkedin\.com|app\.net|plus\.google\.com/i,
        $c =~ /href="([^"]+)"/gi
    ];

    warn "good ($item->{Url})";
}

my $nomap = sub { "nomap @_" };
print Dumper {
    map {
        $_ => [
            keys %{
                {
                    map {
                        my $u = URI->new($_);
                        ( $strippers->{ $u->host } || $nomap )->($u) => 1
                    } @{ $matches{$_} }
                }
            }
          ]
      }
      keys %matches
};

__DATA__
{
   "SearchResponse":{
      "Version":"2.2",
      "Query":{
         "SearchTerms":"testign"
      },
      "Spell":{
         "Total":1,
         "Results":[
            {
               "Value":"testing"
            }
         ]
      },
      "Web":{
         "Total":5100,
         "Offset":0,
         "Results":[
{ "Url":"https://agilewarrior.wordpress.com" },
{ "Url":"https://daviddesmet.wordpress.com" },
{ "Url":"https://sdarchitect.wordpress.com" },
{ "Url":"https://estimagility.wordpress.com" }
         ]
      }
   }
}
