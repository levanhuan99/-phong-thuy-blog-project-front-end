import {Component, OnInit} from '@angular/core';
import {BlogService} from '../services/blog.service';
import {Iblog} from '../interface/iblog';

declare var $: any;

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogs: any = [];

  constructor(private blogService: BlogService) {
  }

  ngOnInit(): void {
    this.getAllBlogs();
  }

  getAllBlogs() {
    this.blogService.getAllBlogByTime().subscribe((resp: Iblog) => {
      this.blogs = resp;
      $(function() {
        var i = 0;
        $('.ftco-animate').waypoint(function(direction) {

          if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {

            i++;

            $(this.element).addClass('item-animate');
            setTimeout(function() {

              $('body .ftco-animate.item-animate').each(function(k) {
                var el = $(this);
                setTimeout(function() {
                  var effect = el.data('animate-effect');
                  if (effect === 'fadeIn') {
                    el.addClass('fadeIn ftco-animated');
                  } else if (effect === 'fadeInLeft') {
                    el.addClass('fadeInLeft ftco-animated');
                  } else if (effect === 'fadeInRight') {
                    el.addClass('fadeInRight ftco-animated');
                  } else {
                    el.addClass('fadeInUp ftco-animated');
                  }
                  el.removeClass('item-animate');
                }, k * 50, 'easeInOutExpo');
              });

            }, 100);

          }

        }, {offset: '95%'});
        var loader = function() {
          setTimeout(function() {
            if ($('#ftco-loader').length > 0) {
              $('#ftco-loader').removeClass('show');
            }
          }, 1);
        };
        loader();
      });
      console.log('ok');
    });
  }

}
